<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = Subject::select([
            "*",
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
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subject $subject)
    {
        //
    }

    public function subject_add(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];
    
        try {
            // Check if weekly_hours is valid before processing
            if ($request->weekly_hours && !\Carbon\Carbon::hasFormat($request->weekly_hours, 'H:i')) {
                throw new \Exception("Invalid time format for weekly hours");
            }
    
            $weekly_hours = $request->weekly_hours
                ? \Carbon\Carbon::createFromFormat('H:i', $request->weekly_hours, 'Asia/Manila')->format('H:i')
                : null;
    
            $data = [
                "department_id" => $request->department_id,
                "subject_code" => $request->subject_code,
                "credits" => $request->credits,
                "weekly_hours" => $weekly_hours,
                "semester" => $request->semester,
            ];
    
            $query = Subject::updateOrCreate(
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
    
        } catch (\Exception $e) {
            $ret = [
                "success" => false,
                "message" => "Error in processing weekly hours: " . $e->getMessage(),
                "data" => $request->all()
            ];
        }
    
        return response()->json($ret, 200);
    }

    public function subject_delete(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not " . ($request->id ? "deleted" : "saved"),
            "data" => $request->all()
        ];

        $query = Subject::where('id', $request->id)->delete();
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