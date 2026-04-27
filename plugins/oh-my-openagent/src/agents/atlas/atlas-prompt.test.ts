import { describe, test, expect } from "bun:test"
import { ATLAS_SYSTEM_PROMPT } from "./default"

describe("Atlas prompts auto-continue policy", () => {
  test("default variant should forbid asking user for continuation confirmation", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT

    // when
    const lowerPrompt = prompt.toLowerCase()

    // then
    expect(lowerPrompt).toContain("auto-continue policy")
    expect(lowerPrompt).toContain("never ask the user")
    expect(lowerPrompt).toContain("should i continue")
    expect(lowerPrompt).toContain("proceed to next task")
    expect(lowerPrompt).toContain("approval-style")
    expect(lowerPrompt).toContain("auto-continue immediately")
  })



  test("default variant should require immediate continuation after verification passes", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT
    const lowerPrompt = prompt.toLowerCase()

    // when / then
    expect(lowerPrompt).toMatch(/auto-continue immediately after verification/)
    expect(lowerPrompt).toMatch(/immediately delegate next task/)
  })

  test("default variant should define when user interaction is actually needed", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT
    const lowerPrompt = prompt.toLowerCase()

    // when / then
    expect(lowerPrompt).toMatch(/only pause.*truly blocked/)
    expect(lowerPrompt).toMatch(/plan needs clarification|blocked by external/)
  })
})

describe("Atlas prompts anti-duplication coverage", () => {
  test("default variant should include anti-duplication rules for delegated exploration", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT

    // when / then
    expect(prompt).toContain("<Anti_Duplication>")
    expect(prompt).toContain("Anti-Duplication Rule")
    expect(prompt).toContain("DO NOT perform the same search yourself")
    expect(prompt).toContain("non-overlapping work")
  })

  test("all variants should define when user interaction is actually needed", () => {
    // given
    const prompts = [ATLAS_SYSTEM_PROMPT, ATLAS_GPT_SYSTEM_PROMPT, ATLAS_GEMINI_SYSTEM_PROMPT]

    // when / then
    for (const prompt of prompts) {
      const lowerPrompt = prompt.toLowerCase()
      expect(lowerPrompt).toMatch(/only pause.*truly blocked/)
      expect(lowerPrompt).toMatch(/plan needs clarification|blocked by external/)
    }
  })
})

describe("Atlas prompts anti-duplication coverage", () => {
  test("all variants should include anti-duplication rules for delegated exploration", () => {
    // given
    const prompts = [ATLAS_SYSTEM_PROMPT, ATLAS_GPT_SYSTEM_PROMPT, ATLAS_GEMINI_SYSTEM_PROMPT]

    // when / then
    for (const prompt of prompts) {
      expect(prompt).toContain("<Anti_Duplication>")
      expect(prompt).toContain("Anti-Duplication Rule")
      expect(prompt).toContain("DO NOT perform the same search yourself")
      expect(prompt).toContain("non-overlapping work")
    }
  })
})

describe("Atlas prompts plan path consistency", () => {
  test("default variant should use .sisyphus/plans/{plan-name}.md path", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT

    // when / then
    expect(prompt).toContain(".sisyphus/plans/{plan-name}.md")
    expect(prompt).not.toContain(".sisyphus/tasks/{plan-name}.yaml")
    expect(prompt).not.toContain(".sisyphus/tasks/")
  })

  test("default variant should read plan file after verification", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT

    // when / then
    expect(prompt).toMatch(/read[\s\S]*?\.sisyphus\/plans\//)
  })

  test("default variant should distinguish top-level plan tasks from nested checkboxes", () => {
    // given
    const prompt = ATLAS_SYSTEM_PROMPT
    const lowerPrompt = prompt.toLowerCase()

    // when / then
    expect(lowerPrompt).toMatch(/top-level.*checkbox/)
    expect(lowerPrompt).toMatch(/ignore nested.*checkbox/)
    expect(lowerPrompt).toMatch(/final verification wave/)
  })

  test("all variants should distinguish top-level plan tasks from nested checkboxes", () => {
    // given
    const prompts = [ATLAS_SYSTEM_PROMPT, ATLAS_GPT_SYSTEM_PROMPT, ATLAS_GEMINI_SYSTEM_PROMPT]

    // when / then
    for (const prompt of prompts) {
      const lowerPrompt = prompt.toLowerCase()
      expect(lowerPrompt).toMatch(/top-level.*checkbox/)
      expect(lowerPrompt).toMatch(/ignore nested.*checkbox/)
      expect(lowerPrompt).toMatch(/final verification wave/)
    }
  })
})
