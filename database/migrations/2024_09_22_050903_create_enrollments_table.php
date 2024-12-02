<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrollmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();


            $table->integer('student_id')->nullable();
            $table->integer('schedule_id')->nullable();
            $table->integer('room_id')->nullable();
            $table->date('date_enrolled')->nullable();
            $table->string('subject_code')->nullable();
            $table->decimal('grade', 5, 2)->nullable();
            $table->enum('status', ['Completed', 'Dropped', 'Waitlisted'])->nullable();
            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enrollments');
    }
}