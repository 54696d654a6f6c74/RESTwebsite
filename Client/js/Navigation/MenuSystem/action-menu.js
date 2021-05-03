import { httpGet } from "../../../../Public/js/utils.js";
import { SelectionMenu } from "./selection-menu.js";
import { getDataHeaderTitle } from "../../DataTypes/mapper.js";
import Pager from "../../Paging/pager.js";
import getTemplate from "../../Paging/templates/basic.js";

export class ActionMenu extends SelectionMenu
{
    static async load_and_render(render_target, href, func_name)
    {
        function process_data_into_header(data)
        {
            let processed_headers = {};

            for(let i = 0; i < data.headers.length; i++)
                processed_headers[data.indecies[i]] = data.headers[i];
            
            return processed_headers;
        }

        let curPage = localStorage["page"] ?? 1;
        let data = await httpGet(localStorage["operationTarget"] + "/sorted?page=" + curPage);
        let pageCount = await httpGet(localStorage["operationTarget"] + "/pages");
        let pager = new Pager(pageCount.pages, "any");

        const headers = process_data_into_header(data);
        const title_name = getDataHeaderTitle();
        
        const titles = [];

        for(let i in headers)
            titles.push(headers[i][title_name]);
        
        
        const instance = new ActionMenu(render_target, titles, href, func_name, data.indecies);

        instance.render();
        pager.render(render_target, getTemplate)
    }
}
