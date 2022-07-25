import {SettingsHandler} from "../settings.js";
import Imgui from "../imgui";

export class Prefs extends SettingsHandler
{
    imgui: Imgui | null;
    nmspace: string;
    vals: Record<string, any>;

    constructor(nmspace: string)
    {
        super();
        this.imgui = null;
        this.nmspace = nmspace;
        this.vals = {};
    }

    Begin(imgui: Imgui)
    {
        this.imgui = imgui;
    }

    GetTypeName() { return "Prefs"; }

    Clear(val: string| null =null)
    {
        if(!val)
            this.vals = {};
        else
            delete this.vals[val];
    }

    Encapsulate() // @override 
    {
        return this.vals;
    }

    Instantiate(imgui: Imgui, o: Record<string, any>) // @override of SettingsHandler
    {
        console.assert(this.imgui === imgui);
        this.vals = o;
    }

    SetValue(nm: string, value: any) // @override
    {
        if(!nm) 
        {
            console.assert(!!nm);
            return;
        }

        if(this.vals[nm] != value)
        {
            this.vals[nm] = value;
            if(this.imgui)
                this.imgui.MarkIniSettingsDirty();
        }
    }

    GetValue(nm: string, fallback: any) // @override
    {
        if(!nm) 
        {
            console.assert(!!nm);
            return fallback;
        }

        let ret = this.vals[nm]; // may be undefined
        if(ret === undefined)
            ret = fallback;
        return ret;
    }
}
