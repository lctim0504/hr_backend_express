export interface MenuDictionary {
    [key: string]: {
        getDataUrl: string;
        pk: string;
        deleteUrl: string;
        putUrl: string;
        Form: React.FC<any>; // 新增一個 Form 的屬性
    };
}
