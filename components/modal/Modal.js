import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, setIsOpen, data }) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center p-8 px-4 bg-gray-900 bg-opacity-50"
      >
        <Dialog.Overlay />
        <div className="flex flex-col max-h-screen px-4 py-8 overflow-y-auto text-center text-gray-700 bg-white rounded-md w-96 md:w-[32rem]">
          <Dialog.Title className="text-xl font-medium">
            {data.summary}
          </Dialog.Title>
          <Dialog.Description
            className="text-sm text-left whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></Dialog.Description>

          <button
            onClick={() => setIsOpen(false)}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-red-500 hover:bg-danger focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
}
