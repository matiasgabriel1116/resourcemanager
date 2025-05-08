<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProjectResource;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        return ProjectResource::collection(Project::all());
    }
}
