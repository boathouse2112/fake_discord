import { Dialog } from "@headlessui/react";
import AvatarEditor from "react-avatar-editor";
import React, { useRef, useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import ActionButton from "../buttons/ActionButton";
import SecondaryButton from "../buttons/SecondaryButton";

const AvatarUploadPreview = (props: {
  isOpen: boolean;
  avatarUrl: string;
  skip: () => void;
  cancel: () => void;
}) => {
  const editor = useRef<AvatarEditor>(null);

  // Zoom of the avatar editor. Values in range [1, 2]
  const [scale, setScale] = useState(1);

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setScale(parseFloat(value));
  };

  const handleSubmit = () => {
    editor?.current?.getImageScaledToCanvas().toBlob((avatar) => {}, "png");
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.cancel}
      className={"relative z-50"}
    >
      <div className={"fixed inset-0 bg-black/80"} />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel
          className={"w-full max-w-md rounded overflow-hidden flex flex-col"}
        >
          <div className={"p-4 bg-neutral-700 flex flex-col gap-4"}>
            <Dialog.Title className={"text-2xl text-neutral-50"}>
              Preview Image
            </Dialog.Title>
            <Dialog.Description className={"hidden"}>
              Preview the new avatar image
            </Dialog.Description>
            {/* Did some REM -> px math. */}
            <AvatarEditor
              ref={editor}
              image={props.avatarUrl}
              width={256}
              height={256}
              border={[80, 0]}
              borderRadius={128}
              scale={scale}
            />
            <div className={"px-4 flex items-center gap-4"}>
              <div className={"flex-shrink-0"}>
                <PhotographIcon width={24} className={"fill-neutral-300"} />
              </div>
              <input
                className={"w-full focus:outline-none"}
                type={"range"}
                name={"avatar scale"}
                value={scale}
                min={1}
                max={2}
                step={0.02}
                onChange={handleScaleChange}
              />
              <div className={"flex-shrink-0"}>
                <PhotographIcon width={48} className={"fill-neutral-300"} />
              </div>
            </div>
          </div>
          <div className={"pr-4 pt-4 pb-4 flex bg-neutral-800 justify-between"}>
            <SecondaryButton onClick={props.skip}>Skip</SecondaryButton>
            <div className={"flex gap-2"}>
              <SecondaryButton onClick={props.cancel}>Cancel</SecondaryButton>
              <ActionButton>Apply</ActionButton>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AvatarUploadPreview;
