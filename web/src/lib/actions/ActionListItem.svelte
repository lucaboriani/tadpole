<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    /**
	 * @type {{name: string; namespace: string; annotations: Array<{key:string, value:any}>}}
	 */
	export let action;

    const {annotations} = action
    const webEnabled = annotations.find(annotation => annotation.key === 'web-export')
    const exec = annotations.find(annotation => annotation.key === 'exec')
    /**
	 * @param {Object} action
	 */
    function actionSelected(action) {
		dispatch('action-selected', action);
	}
</script>
<div>
   
    <button 
        class="flex flex-col" 
        on:click={() => actionSelected(action)}
    >
        <span class="text-xl pl-4">{action.name}</span>
        <div class="flex pl-4 text-sm">
            <span>{exec ? exec?.value : 'unknown'}</span>
            <span class="flex ml-2">
                web: 
                <input class="ml-2" type="checkbox" checked={webEnabled ? webEnabled.value : false} disabled />
            </span>
        </div>
    </button>
</div>