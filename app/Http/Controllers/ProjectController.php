<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(protected ProjectService $service)
    {}

    public function index(Request $request)
    {
        if ($request->wantsJson()) {
            $projects = $this->service->getPaginated($request->only('search'));
            return ProjectResource::collection($projects);
        }

        return Inertia::render('Projects/Index');
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('projects.index');
    }

    public function update(StoreProjectRequest $request, Project $project)
    {
        $this->service->update($project, $request->validated());
        return redirect()->route('projects.index')->with('success', 'Project updated!');
    }

    public function destroy(Project $project)
    {
        $this->service->delete($project);
        return redirect()->route('projects.index')->with('success', 'Project deleted!');
    }
}