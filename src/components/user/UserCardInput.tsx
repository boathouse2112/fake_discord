import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextContent } from "../../types";
import { sendMessage } from "../../firebase/functions";
import { nanoid } from "nanoid";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";

const UserCardInput = (props: { interlocutorId: string }) => {
  const navigate = useNavigate();
  const { data: user } = useAuthUser("auth-user", auth);
  const uid = user?.uid;

  const [state, setState] = useState("");

  // On change, update message input state.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
  };

  // On (non-shift) enter, submit the input form.
  const onEnterPress = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSubmit();
    }
  };

  // On submit, redirect to
  const handleSubmit = async () => {
    const content: TextContent = { type: "text", text: state };
    console.log(sendMessage.toString());
    await sendMessage({
      interlocutorId: props.interlocutorId,
      message: { id: nanoid(), authorId: uid, content },
    });

    navigate({ pathname: `` });
  };

  return (
    <>
      <input
        className="w-full h-12 px-4 rounded-md bg-neutral-400 outline-none text-white"
        type="text"
        value={state}
        onChange={handleChange}
        onKeyDown={onEnterPress}
      ></input>
    </>
  );
};

export default UserCardInput;
