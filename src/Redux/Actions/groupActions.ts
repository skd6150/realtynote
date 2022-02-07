export const ADD_GROUP = 'GROUP/ADD' as const;
export const addGroup = (name: string) => {
  return {
    type: ADD_GROUP,
    name,
  };
};

export const DEL_GROUP = 'GROUP/DEL' as const;
export const delGroup = (groupKey: string) => {
  return {
    type: DEL_GROUP,
    groupKey,
  };
};

export const RENAME_GROUP = 'GROUP/RENAME' as const;
export const renameGroup = (groupKey: string, name: string) => {
  return {
    type: RENAME_GROUP,
    groupKey,
    name,
  };
};

export type GroupActions =
  | ReturnType<typeof addGroup>
  | ReturnType<typeof delGroup>
  | ReturnType<typeof renameGroup>;
