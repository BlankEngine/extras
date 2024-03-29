/*

Plugin that lets you make the pixels in the screen crispier.

Version : 1f - Raw


Copyright (c) 2024 Desert Lake

Licensed under MIT (https://github.com/crystal2d/extras/blob/main/LICENSE.md)

*/


/**
 * Manages the crispiness of the screen.
 * 
 * @public
 * @static
 * @class
 */
class Crispixels
{
    // Private Static Properties
    
    static #enabled = false;
    
    static #isMs = null;
    
    
    // Static Properties
    
    /**
     * Enables/disables the effect
     * 
     * @memberof Crispixels
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static get effect ()
    {
        return this.#enabled;
    }
    
    /**
     * Enables/disables the effect
     * 
     * @memberof Crispixels
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static set effect (value)
    {
        this.#enabled = value;
        
        this.#update();
    }
    
    
    // Private Static Methods
    
    static #update ()
    {
        const canvas = Application.htmlCanvas;
        
        if (canvas == null) throw BlankEngine.Err(1);
        
        if (this.#isMs == null)
        {
            this.#isMs = window.getComputedStyle(canvas).msInterpolationMode != null;
        }
        
        if (this.#enabled)
        {
            if (this.#isMs) return canvas.style.msInterpolationMode = "nearest-neighbor";
            
            canvas.style.imageRendering = "pixelated";
            
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "crisp-edges";
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "optimize-contrast";
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "-webkit-optimize-contrast";
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "-o-crisp-edges";
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "-moz-crisp-edges";
            if (window.getComputedStyle(canvas).imageRendering === "auto") canvas.style.imageRendering = "optimizeSpeed";
            
            return;
        }
        
        if (this.#isMs) return canvas.style.msInterpolationMode = "auto";
        
        canvas.style.imageRendering = "auto";
    }
}