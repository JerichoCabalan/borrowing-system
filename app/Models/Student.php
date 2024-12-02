<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;


    protected $guarded = [];
    public function class_schedules()
    {
        return $this->hasMany(ClassSchedules::class, "student_id");
    }
    public function enrollment()
    {
        return $this->hasMany(Enrollment::class, "student_id");
    }
    public function notification()
    {
        return $this->hasMany(Notification::class, "student_id");
    }
}