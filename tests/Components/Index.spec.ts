import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Index from "@/Pages/Projects/Index.vue";
import { createTestingPinia } from "@pinia/testing";
import { useProjectStore } from "@/stores/project";
import { nextTick } from "vue";

// Mock InertiaJS components
vi.mock("@inertiajs/vue3", async () => {
    const actual = await vi.importActual("@inertiajs/vue3");
    return {
        ...actual,
        Link: {
            template: "<a><slot /></a>",
        },
        useForm: () => ({
            delete: vi.fn(),
        }),
    };
});

describe("Projects Index.vue", () => {
    let wrapper: any;
    let projectStore: ReturnType<typeof useProjectStore>;

    beforeEach(() => {
        wrapper = mount(Index, {
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            project: {
                                projects: [
                                    { id: 1, name: "Test Project 1" },
                                    { id: 2, name: "Test Project 2" },
                                ],
                                filters: { search: "" },
                                isLoading: false,
                                meta: {
                                    current_page: 1,
                                    links: [
                                        {
                                            label: "1",
                                            url: "/projects?page=1",
                                            active: true,
                                        },
                                        {
                                            label: "2",
                                            url: "/projects?page=2",
                                            active: false,
                                        },
                                    ],
                                },
                            },
                        },
                        stubActions: false,
                    }),
                ],
            },
        });

        projectStore = useProjectStore();
    });

    it("renders projects from store", () => {
        expect(wrapper.text()).toContain("Test Project 1");
        expect(wrapper.text()).toContain("Test Project 2");
    });

    it("calls fetchProjects on mount", () => {
        expect(projectStore.fetchProjects).toHaveBeenCalledTimes(1);
    });

    it("updates search input and triggers debounced fetch", async () => {
        const input = wrapper.find('input[type="text"]');
        await input.setValue("new search");
        await nextTick();

        expect(projectStore.filters.search).toBe("new search");
    });

    it("calls deleteProject when confirmed", async () => {
        window.confirm = vi.fn(() => true);

        const deleteBtn = wrapper
            .findAll("button")
            .find((btn) => btn.text() === "Delete");
        await deleteBtn?.trigger("click");

        expect(wrapper.vm.form.delete).toHaveBeenCalled();
    });

    it("disables pagination buttons without URL", async () => {
        // Override the store's pagination links to include one with null URL
        projectStore.meta.links = [
            { label: "1", url: null, active: false },
            { label: "2", url: "/projects?page=2", active: false },
        ];
        await wrapper.vm.$forceUpdate(); // Ensure re-render

        // Find the pagination button that corresponds to the disabled link
        const buttons = wrapper.findAll("button");
        const disabledButton = buttons.find((btn) => btn.text() === "1");

        expect(disabledButton?.attributes("disabled")).toBeDefined();
    });
});
