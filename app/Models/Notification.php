<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function student()
    {
        return $this->belongsTo(Student::class, "student_id");
    }
    public function instructor()
    {
        return $this->belongsTo(Instructor::class, "instructor_id");
    }
}