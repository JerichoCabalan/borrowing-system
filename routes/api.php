<?php

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('api.access')->group(function () {

// Your API routes go here
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
// Route::post('register', '\App\Http\Controllers\AuthController@register');
// Route::post('forgot_password', 'App\Http\Controllers\AuthController@forgot_password');

Route::middleware('auth:api')->group(function () {
    // UserController
    Route::post('user_profile_photo_update', [App\Http\Controllers\UserController::class, "user_profile_photo_update"]);
    Route::get('user_profile_info', [App\Http\Controllers\UserController::class, "user_profile_info"]);
    Route::post('user_profile_info_update', [App\Http\Controllers\UserController::class, "user_profile_info_update"]);
    Route::post('user_update_role', [App\Http\Controllers\UserController::class, "user_update_role"]);
    Route::post('user_deactivate', [App\Http\Controllers\UserController::class, "user_deactivate"]);
    Route::post('users_update_email', [App\Http\Controllers\UserController::class, "users_update_email"]);
    Route::post('users_update_password', [App\Http\Controllers\UserController::class, "users_update_password"]);
    Route::post('users_info_update_password', [App\Http\Controllers\UserController::class, "users_info_update_password"]);
    Route::apiResource('users', App\Http\Controllers\UserController::class);
    // END UserController


    Route::apiResource('profile', App\Http\Controllers\ProfileController::class);
    // END ProfileController

    // StudentExamResultController

    // END SCHEDULES

    Route::apiResource('student', App\Http\Controllers\StudentController::class);
    Route::post('student_add', [App\Http\Controllers\StudentController::class, 'student_add']);
    Route::post('student_delete', [App\Http\Controllers\StudentController::class, 'student_delete']);

    Route::apiResource('class_schedule', App\Http\Controllers\ClassSchedulesController::class);
    Route::post('class_schedule_add', [App\Http\Controllers\ClassSchedulesController::class, 'class_schedule_add']);
    Route::post('class_schedule_delete', [App\Http\Controllers\ClassSchedulesController::class, 'class_schedule_delete']);

    Route::apiResource('subject', App\Http\Controllers\SubjectController::class);
    Route::post('subject_add', [App\Http\Controllers\SubjectController::class, 'subject_add']);
    Route::post('subject_delete', [App\Http\Controllers\SubjectController::class, 'subject_delete']);

    Route::apiResource('enrollment', App\Http\Controllers\EnrollmentController::class);
    Route::post('enrollment_add', [App\Http\Controllers\EnrollmentController::class, 'enrollment_add']);
    Route::post('enrollment_delete', [App\Http\Controllers\EnrollmentController::class, 'enrollment_delete']);


    Route::apiResource('department', App\Http\Controllers\DepartmentController::class);
    Route::post('department_add', [App\Http\Controllers\DepartmentController::class, 'department_add']);
    Route::post('department_delete', [App\Http\Controllers\DepartmentController::class, 'department_delete']);
    Route::apiResource('instructor', App\Http\Controllers\InstructorController::class);
    Route::post('instructor_add', [App\Http\Controllers\InstructorController::class, 'instructor_add']);
    Route::post('instructor_delete', [App\Http\Controllers\InstructorController::class, 'instructor_delete']);
    Route::apiResource('room', App\Http\Controllers\RoomController::class);
    Route::post('room_add', [App\Http\Controllers\RoomController::class, 'room_add']);
    Route::post('room_delete', [App\Http\Controllers\RoomController::class, 'room_delete']);
    Route::apiResource('notification', App\Http\Controllers\NotificationController::class);
    Route::post('notification_add', [App\Http\Controllers\NotificationController::class, 'notification_add']);
    Route::post('notification_delete', [App\Http\Controllers\NotificationController::class, 'notification_delete']);
    Route::apiResource('administrative_overrides', App\Http\Controllers\AdministrativeOverridesController::class);
    Route::post('admin_add', [App\Http\Controllers\AdministrativeOverridesController::class, 'admin_add']);
    Route::post('admin_delete', [App\Http\Controllers\AdministrativeOverridesController::class, 'admin_delete']);
});


// });