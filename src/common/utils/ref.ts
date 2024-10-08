export const hasTag = (id: number | undefined) => {
  if (!id) {
    return {
      path: "tag",
      select: "-_id",
    };
  }

  return {
    path: "tag",
    select: "-_id",
    match: {
      tag_id: id,
    },
  };
};