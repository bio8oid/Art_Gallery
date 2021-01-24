// State

export interface StateTypes {
   items: Array<object>;
   itemsId: Array<string>;
   language: string;
   singleItem: Array<object>;
   paginationNumbers: Array<number>;
   paginatedItems: Array<Item>;
   relatedItems: Array<object>;
   siteMap: Array<object>;
   maxRecordsNumber: string;
   recordsPerPage: number;
   APIkey: string;
   loading: boolean;
   error: string;
   route: string;
}

// Site Map types

export interface Router {
   options: Content;
   history?: Current;
}

export interface Content {
   routes: Array<Routes>;
}

export interface Routes {
   component?: object;
   name?: string;
   path?: string;
}

export interface Current {
   current: Path;
}

export interface Path {
   path: string;
}

// Sorted Items

export interface Item {
   title: string;
   longTitle: string;
}

// Items Id's

export interface Id {
   objectNumber: string;
}
