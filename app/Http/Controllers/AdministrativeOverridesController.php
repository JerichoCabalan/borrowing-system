<?php

namespace App\Http\Controllers;

use App\Models\AdministrativeOverrides;
use Illuminate\Http\Request;

class AdministrativeOverridesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = AdministrativeOverrides::select([
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
//         if (isset(
//             $request->student_id
//         )) {
//             $data = $data->where(
//                 'student_id
// ',
//                 $request->student_id
//             );
//         }
//         if (isset(
//             $request->subject_id
//         )) {
//             $data = $data->where(
//                 'subject_id
// ',
//                 $request->subject_id
//             );
//         }

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
     * @param  \App\Models\AdministrativeOverrides  $administrativeOverrides
     * @return \Illuminate\Http\Response
     */
    public function show(AdministrativeOverrides $administrativeOverrides)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdministrativeOverrides  $administrativeOverrides
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AdministrativeOverrides $administrativeOverrides)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdministrativeOverrides  $administrativeOverrides
     * @return \Illuminate\Http\Response
     */
    public function destroy(AdministrativeOverrides $administrativeOverrides)
    {
        //
    }

    
    public function admin_add(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];



        $data =  [

            "subject_id" => $request->subject_id,
            "student_id" => $request->student_id,
            "justifications" => $request->justifications,
            "override_type" => $request->override_type,
            "date_approved" => $request->date_approved,

        ];
        $query = AdministrativeOverrides::updateOrCreate(
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

    public function admin_delete(Request $request)
    {
        // Initial response structure
        $ret = [
            "success" => false,
            "message" => "Invalid data provided",
            "data" => $request->all()
        ];
    
        // Check if 'id' exists in the request
        if ($request->has('id')) {
            // Try to find the record first
            $record = AdministrativeOverrides::find($request->id);
    
            if ($record) {
                // Attempt to delete the record
                $query = $record->delete();
    
                if ($query) {
                    // Successfully deleted
                    $ret = [
                        "success" => true,
                        "message" => "Data deleted successfully",
                        "data" => $request->all()
                    ];
                } else {
                    // Deletion failed
                    $ret['message'] = "Failed to delete data";
                }
            } else {
                // Record not found
                $ret['message'] = "Record not found";
            }
        } else {
            // 'id' was not provided in the request
            $ret['message'] = "ID is required";
        }
    
        return response()->json($ret, 200);
    }
    
}