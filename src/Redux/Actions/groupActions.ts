export const ADD_GROUP = 'GROUP/ADD' as const;
export const addGruop = (name: string) => {
  return {
    type: ADD_GROUP,
    name,
  };
};

export const DEL_GROUP = 'GROUP/DEL' as const;
export const delGruop = (groupKey: string) => {
  return {
    type: DEL_GROUP,
    groupKey,
  };
};

export const UPDATE_GROUP = 'GROUP/UPDATE' as const;
export const updateGruop = (groupKey: string, name: string) => {
  return {
    type: UPDATE_GROUP,
    groupKey,
    name,
  };
};

export type GroupActions =
  | ReturnType<typeof addGruop>
  | ReturnType<typeof delGruop>
  | ReturnType<typeof updateGruop>;
