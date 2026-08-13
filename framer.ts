// Framer SDK shim for local testing.
// In the real Framer environment, these come from the "framer" package.
// This shim provides no-op implementations so the component compiles locally.

export const ControlType = {
    String: "string",
    Number: "number",
    Boolean: "boolean",
    Color: "color",
    Enum: "enum",
    File: "file",
    Image: "image",
    Array: "array",
    Object: "object",
    ComponentInstance: "componentinstance",
    FusedNumber: "fusednumber",
    Transition: "transition",
    EventHandler: "eventhandler",
    Link: "link",
} as const

export function addPropertyControls(_component: any, _controls: any): void {
    // No-op in local testing. In Framer, this registers property controls
    // that appear in the right-hand panel of the editor.
}
