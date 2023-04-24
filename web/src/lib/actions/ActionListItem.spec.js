import '@testing-library/jest-dom'
import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import ActionListItem from './ActionListItem.svelte'

// mocks
import { helloAction } from '../mocks/helloAction';
import { webEnabledAction } from '../mocks/webEnabledAction'




describe("ActionListItem, default hello action", () => {
 
  test("checks if action name and kind are displayed", () => {
    //@ts-ignore
    render(ActionListItem, { props: { action: helloAction } });
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("nodejs:14")).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  });
  test("checks if proper data is passed on action selection", async() => {
    //@ts-ignore
    const { component } = render(ActionListItem, { props: { action: helloAction } });
     
    /**
	 * @type {{
    *  name: string; 
    *  namespace: string; 
    *  annotations: Array<{key:string, value:any}>
    * }}
    */ 
    let action = {name:"", namespace:"", annotations:[]};
    // Mock function
    const mock = vi.fn((event) => (action = event.detail));
    component.$on('action-selected', mock);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mock).toHaveBeenCalled();
    
    expect(action.name).toBe('hello');
    expect(action.namespace).toBe('nuvolaris');

    const provideApiKey = action.annotations.find(annotation => annotation.key === 'provide-api-key')
    expect(provideApiKey).toBeDefined()
    expect(provideApiKey?.value).toBe(false);
    const exec = action.annotations.find(annotation => annotation.key === 'exec')
    expect(exec).toBeDefined()
    expect(exec?.value).toBe('nodejs:14');
    
    
  });
  
  test("checks webEnabledAction", async() => {
    //@ts-ignore
    const { component } = render(ActionListItem, { props: { action: webEnabledAction } });
     
    /**
	 * @type {{
    *  name: string; 
    *  namespace: string; 
    *  annotations: Array<{key:string, value:any}>
    * }}
    */ 
    let action = {name:"", namespace:"", annotations:[]};
    // Mock function
    const mock = vi.fn((event) => (action = event.detail));
    component.$on('action-selected', mock);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mock).toHaveBeenCalled();
    
    expect(action.name).toBe('set');
    expect(action.namespace).toBe('nuvolaris/tasklist');

    const provideApiKey = action.annotations.find(annotation => annotation.key === 'provide-api-key')
    expect(provideApiKey).toBeDefined()
    expect(provideApiKey?.value).toBe(false);
    const exec = action.annotations.find(annotation => annotation.key === 'exec')
    expect(exec).toBeDefined()
    expect(exec?.value).toBe('nodejs:14');

    const final = action.annotations.find(annotation => annotation.key === 'final')
    expect(final).toBeDefined()
    expect(final?.value).toBe(true);
    
    const web = action.annotations.find(annotation => annotation.key === 'web-export')
    expect(web).toBeDefined()
    expect(web?.value).toBe(true);
    
    
  });
});