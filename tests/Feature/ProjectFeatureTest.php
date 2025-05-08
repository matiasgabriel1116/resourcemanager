<?php

use App\Models\Project;
use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\getJson;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use Illuminate\Foundation\Testing\RefreshDatabase;use Illuminate\Testing\Fluent\AssertableJson;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

it('can list projects as JSON', function () {
    Project::factory()->create(['name' => 'Abshire, Torphy and Gutkowski']);

    getJson('/projects')
        ->assertOk()
        ->assertJson(fn(AssertableJson $json) =>
            $json->hasAll(['data', 'links', 'meta'])
                ->has('data.0.name')
                ->where('data.0.name', 'Abshire, Torphy and Gutkowski')
        );
});

it('can create a project', function () {
    post('/projects', [
        'name' => 'New Project',
    ])->assertRedirect('/projects');

    assertDatabaseHas('projects', ['name' => 'New Project']);
});

it('validates project name is required', function () {
    post('/projects', [])
        ->assertSessionHasErrors('name');
});

it('can update a project', function () {
    $project = Project::factory()->create(['name' => 'Old Name']);

    put("/projects/{$project->id}", [
        'name' => 'Updated Name',
    ])->assertRedirect('/projects');

    assertDatabaseHas('projects', ['name' => 'Updated Name']);
});

it('can delete a project', function () {
    $project = Project::factory()->create();

    delete("/projects/{$project->id}")
        ->assertRedirect('/projects');

    assertDatabaseMissing('projects', ['id' => $project->id]);
});
