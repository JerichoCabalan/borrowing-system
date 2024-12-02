<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enrollment extends Model
{
    use HasFactory, SoftDeletes;


    public function student()
    {
        return $this->belongsTo(Student::class, "student_id");
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class, "subject_id");
    }
    protected $guarded = [];

    
}