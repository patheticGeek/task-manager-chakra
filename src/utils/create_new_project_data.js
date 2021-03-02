export default (name) => {
  const now = Date.now();
  return {
    name: name,
    created_at: now,
    tasks: {
      newtask1: {
        name: "First task",
        content: "About this task...",
        created_at: now,
        updated_at: now,
        tag: "Illustration"
      },
      newtask2: {
        name: "First task",
        content: "About this task...",
        created_at: now,
        updated_at: now,
        tag: "Illustration"
      },
      newtask3: {
        name: "First task",
        content: "About this task...",
        created_at: now,
        updated_at: now,
        tag: "Illustration"
      },
      newtask4: {
        name: "First task",
        content: "About this task...",
        created_at: now,
        updated_at: now,
        tag: "Illustration"
      }
    },
    rows: ["todo", "inprogress", "review", "done"],
    row_data: {
      todo: { name: "Todo", tasks: ["newtask1"] },
      inprogress: { name: "In Progress", tasks: ["newtask2"] },
      review: { name: "Needs Review", tasks: ["newtask3"] },
      done: { name: "Done", tasks: ["newtask4"] }
    }
  };
};
