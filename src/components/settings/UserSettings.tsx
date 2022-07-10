import React, { useState } from "react";
import AvatarUploadPreview from "./AvatarUploadPreview";
import SecondaryButton from "../buttons/SecondaryButton";

const UserSettings = () => {
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [avatarPreviewOpen, setAvatarPreviewOpen] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (fileList !== null) {
      const file = fileList[0];
      setAvatarFile(file);
      setAvatarPreviewOpen(true);
    }
  };

  const cancelAvatar = () => {
    setAvatarFile(undefined);
    setAvatarPreviewOpen(false);
  };

  const skipAvatar = () => {
    const avi = avatarFile;
    setAvatarFile(undefined);
  };

  return (
    <>
      {avatarFile ? (
        <AvatarUploadPreview
          isOpen={avatarPreviewOpen}
          setIsOpen={setAvatarPreviewOpen}
          avatarUrl={avatarFile}
        />
      ) : undefined}
      <div className={"w-screen h-screen flex"}>
        <div className={"w-1/4 bg-neutral-800"}></div>
        <div
          className={
            "w-3/4 px-8 py-10 flex flex-col gap-6 divide-y divide-neutral-600 bg-neutral-700"
          }
        >
          <h1 className={"text-xl font-semibold text-neutral-50"}>
            User Profile
          </h1>
          <div
            className={
              "pt-6 flex flex-col gap-6 divide-y divide-neutral-600 text-sm text-neutral-200"
            }
          >
            <div>
              <h2 className={"mb-2 uppercase font-semibold tracking-tight"}>
                Avatar
              </h2>
              <input
                type={"file"}
                accept={"image/png, image/jpeg"}
                id={"change-avatar"}
                aria-hidden
                className={"hidden"}
                onChange={handleAvatarChange}
              />
              <label
                htmlFor={"change-avatar"}
                className={
                  "bg-indigo-600 px-5 py-2 rounded cursor-pointer text-neutral-50 font-medium tracking-tight"
                }
              >
                Change Avatar
              </label>
              <SecondaryButton>Remove Avatar</SecondaryButton>
            </div>
            <div className={"pt-6"}>
              <h2 className={"mb-2 uppercase font-semibold tracking-tight"}>
                Profile Color
              </h2>
              <button id={"profile-color-default"}></button>
              <label htmlFor={"profile-color-default"}>Default</label>
              <button id={"profile-color-custom"}></button>
              <label htmlFor={"profile-color-custom"}>Custom</label>
            </div>
            <div className={"pt-6"}>
              <h2>About Me</h2>
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
