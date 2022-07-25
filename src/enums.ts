export enum LayoutType {
  // enum
  Horizontal = 0,
  Vertical = 1,
}

export enum MouseCursor {
  // enum
  None = -1,
  Arrow = 0,
  TextInput = 1, // When hovering over InputText, etc.
  ResizeAll = 2, // (Unused by imgui functions)
  ResizeNS = 3, // When hovering over an horizontal border
  ResizeEW = 4, // When hovering over a vertical border or a column
  ResizeNESW = 5, // When hovering over the bottom-left corner of a window
  ResizeNWSE = 6, // When hovering over the bottom-right corner of a window
  Hand = 7, // (Unused by imgui functions. Use for e.g. hyperlinks)
  COUNT = 8,
}

export enum Key {
  // enum
  Tab = 0,
  LeftArrow = 1,
  RightArrow = 2,
  UpArrow = 3,
  DownArrow = 4,
  PageUp = 5,
  PageDown = 6,
  Home = 7,
  End = 8,
  Insert = 9,
  Delete = 10,
  Backspace = 11,
  Space = 12,
  Enter = 13,
  Escape = 14,
  A = 15, // for text edit CTRL+A= select all
  C = 16, // for text edit CTRL+C= copy
  V = 17, // for text edit CTRL+V= paste
  X = 18, // for text edit CTRL+X= cut
  Y = 19, // for text edit CTRL+Y= redo
  Z = 20, // for text edit CTRL+Z= undo
  COUNT = 21,
}

export enum Dir {
  // enum
  None = -1,
  Left = 0,
  Right = 1,
  Up = 2,
  Down = 3,
  COUNT = 4,
}

export enum InputSource {
  None = 0,
  Mouse = 1,
  Nav = 2,
  NavKeyboard = 3,
  NavGampad = 4,
  COUNT = 5,
}

// FIXME-NAV= Clarify/expose various repeat delay/rate
export enum InputReadMode {
  Down = 0,
  Pressed = 1,
  Released = 2,
  Repeat = 3,
  RepeatSlow = 4,
  RepeatFast = 5,
}

// Gamepad/Keyboard directional navigation
// Keyboard= Set io.ConfigFlags |= ConfigFlags_NavEnableKeyboard to enable.
//  NewFrame() will automatically fill io.NavInputs[] based on your
//  io.KeysDown[] + io.KeyMap[] arrays.
// Gamepad=  Set io.ConfigFlags |= ConfigFlags_NavEnableGamepad to enable.
//  Back-end= set ImGuiBackendFlags_HasGamepad and fill the io.NavInputs[]
//  fields before calling NewFrame(). Note that io.NavInputs[] is cleared by
//  EndFrame().
// Read instructions in imgui.cpp for more details. Download PNG/PSD
// at http=//goo.gl/9LgVZW.
let i = 0;
export enum NavInput {
  // Gamepad Mapping
  Activate = 0, // activate / open / toggle / tweak value       // e.g. Cross  (PS4), A (Xbox), A (Switch), Space (Keyboard)
  Cancel = 1, // cancel / close / exit                        // e.g. Circle (PS4), B (Xbox), B (Switch), Escape (Keyboard)
  Input = 2, // text input / on-screen keyboard              // e.g. Triang.(PS4), Y (Xbox), X (Switch), Return (Keyboard)
  Menu = 3, // tap= toggle menu / hold= focus, move, resize // e.g. Square (PS4), X (Xbox), Y (Switch), Alt (Keyboard)
  DpadLeft = 4, // move / tweak / resize window (w/ PadMenu)    // e.g. D-pad Left/Right/Up/Down (Gamepads), Arrow keys (Keyboard)
  DpadRight = 5, //
  DpadUp = 6, //
  DpadDown = 7, //
  LStickLeft = 8, // scroll / move window (w/ PadMenu)            // e.g. Left Analog Stick Left/Right/Up/Down
  LStickRight = 9, //
  LStickUp = 10, //
  LStickDown = 11, //
  FocusPrev = 12, // next window (w/ PadMenu)                     // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)
  FocusNext = 13, // prev window (w/ PadMenu)                     // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)
  TweakSlow = 14, // slower tweaks                                // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)
  TweakFast = 15, // faster tweaks                                // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)

  // [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
  // Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) will be directly reading from io.KeysDown[] instead of io.NavInputs[].
  KeyMenu_ = 16, // toggle menu                                  // = io.KeyAlt
  KeyTab_ = 17, // tab                                          // = Tab key
  KeyLeft_ = 18, // move left                                    // = Arrow keys
  KeyRight_ = 19, // move right
  KeyUp_ = 20, // move up
  KeyDown_ = 21, // move down
  COUNT = 22,
  InternalStart_ = 16,
}

export enum NavLayer {
  // enum
  Main = 0,
  Menu = 1,
  COUNT = 2,
}

export enum NavForward {
  // enum
  None = 0,
  ForwardQueued = 1,
  ForwardActive = 2,
}

export enum LogType {
  // enum
  None = 0,
  TTY = 1,
  File = 2,
  Buffer = 3,
  Clipboard = 4,
}

export enum Axis {
  // enum
  None = -1,
  X = 0,
  Y = 1,
}
