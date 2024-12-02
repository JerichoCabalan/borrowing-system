<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    public function class_schedules()
    {
        return $this->hasMany(ClassSchedules::class, "subject_id");
    }
    public function enrollment()
    {
        return $this->hasMany(Enrollment::class, "subject_id");
    }
    public function department()
    {
        return $this->belongsTo(Department::class, "department_id");
    }
}
