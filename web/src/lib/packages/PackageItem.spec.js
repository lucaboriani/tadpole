import '@testing-library/jest-dom'
import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import PackageItem from './PackageItem.svelte'

// mocks
import { helloAction } from '../../../mocks/helloAction';




describe("PackageItem", () => {
 
  test("checks if default namespace is displayed", () => {
    const packageName = 'nuvolaris'
    //@ts-ignore
    render(PackageItem, { props: { actions: [], packageName:packageName } });
    expect(screen.getByText("default")).toBeInTheDocument();
    
  });
  test("checks expand prop", async () => {
    const packageName = 'nuvolaris'
    const actions =[helloAction]
    //@ts-ignore
    render(PackageItem, { props: { actions: actions, packageName:packageName, expand:true } });
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("nodejs:14")).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  });
  test("checks expand click behaviour", async () => {
    const packageName = 'nuvolaris'
    const actions = [ helloAction ]
    //@ts-ignore
    render(PackageItem, { props: { actions: actions, packageName:packageName } });
    await userEvent.click(screen.getByText("default"));
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("nodejs:14")).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  });

});