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

export const UPDATE_GROUP = 'GROUP/UPDATE' as const;
export const updateGroup = (groupKey: string, name: string) => {
  return {
    type: UPDATE_GROUP,
    groupKey,
    name,
  };
};

export type GroupActions =
  | ReturnType<typeof addGroup>
  | ReturnType<typeof delGroup>
  | ReturnType<typeof updateGroup>;
