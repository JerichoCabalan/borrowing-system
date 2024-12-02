<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {


        $fullname = "CONCAT(first_name, IF(last_name IS NOT NULL, CONCAT(' ', last_name), ''))";

        $data = Instructor::select([
            "*",
            DB::raw("($fullname) fullname"),

        ]);
        // $data = $data->where(function ($query) use ($request) {
        //     if ($request->search) {
        //         $query->orWhere("payroll_code", 'LIKE', "%$request->search%");
        //         $query->orWhere("employee_type", 'LIKE', "%$request->search%");
        //     }
        // });


        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data = $data->orderBy('id', 'desc');
        }

        if (isset(
            $request->department_id
        )) {
            $data = $data->where(
                'department_id
',
                $request->department_id
            );
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();
        } else {
            $data = $data->get();
        }
        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Instructor  $instructor
     * @return \Illuminate\Http\Response
     */
    public function show(Instructor $instructor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Instructor  $instructor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Instructor $instructor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Instructor  $instructor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Instructor $instructor)
    {
        //
    }


    public function instructor_add(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];



        $data =  [

            "department_id" => $request->department_id,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "aviablility_hours" => $request->aviablility_hours,

        ];
        $query = Instructor::updateOrCreate(
            ["id" => $request->id ?? null],
            $data
        );




        if ($query) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",

            ];
        } else {
            $ret = [
                "success" => false,
                "message" => "Data not " . ($request->id ? "updated" : "saved"),
                "data" => $request->all()
            ];
        }

        return response()->json($ret, 200);
    }

    public function instructor_delete(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not " . ($request->id ? "deleted" : "saved"),
            "data" => $request->all()
        ];

        $query = Instructor::where('id', $request->id)->delete();
        if ($query) {
            $ret = [
                "success" => true,
                "message" => "Data deleted successfully",
                "data" => $request->all()
            ];
        }
        return response()->json($ret, 200);
    }
}