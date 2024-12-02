<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedules;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClassSchedulesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = ClassSchedules::select([
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
        if (isset($request->student_id)) {
            $data = $data->where('student_id', $request->student_id);
        }
        if (isset($request->instructor_id)) {
            $data = $data->where('instructor_id', $request->instructor_id);
        }
        if (isset($request->room_id)) {
            $data = $data->where('room_id', $request->room_id);
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
     * @param  \App\Models\ClassSchedules  $classSchedules
     * @return \Illuminate\Http\Response
     */
    public function show(ClassSchedules $classSchedules)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassSchedules  $classSchedules
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassSchedules $classSchedules)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassSchedules  $classSchedules
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassSchedules $classSchedules)
    {
        //
    }


    public function class_schedule_add(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];

       

        $data =  [

            "subject_id" => $request->subject_id,
            "instructor_id" => $request->instructor_id,
            "room_id" => $request->room_id,
            "start_time" => $request->start_time,
            "end_time" => $request->end_time,
            "day_of_week" => $request->day_of_week,
            "max_student" => $request->max_student,
            "semester" => $request->semester,

        ];
        $query = ClassSchedules::updateOrCreate(
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
    public function class_schedule_delete(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not " . ($request->id ? "deleted" : "saved"),
            "data" => $request->all()
        ];
        $query = ClassSchedules::where('id', $request->id)->delete();
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