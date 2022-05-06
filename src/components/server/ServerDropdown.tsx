import { Menu } from '@headlessui/react';

const ServerDropdown = () => {
  return (
    <div className="absolute">
      <Menu as="div" className="relative top-16 w-56 bg-neutral-800">
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Account settings
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default ServerDropdown;
