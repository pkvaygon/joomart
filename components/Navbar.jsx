"use client";  
import React, {useState} from 'react';
import {Tabs, Tab, Button, Card, CardBody,Input,Modal, ModalContent,useDisclosure,Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "./icons";
import Link from 'next/link';
export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [auth, setAuth] = useState({
    emailOrLogin: 'joomart.online@gmail.com',
    password: 'zhomart1234',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
    console.log(auth)
  };
  const onSubmit = async () => {
    try {
      const { emailOrLogin, password } = auth;
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({emailOrLogin,password }),
      });
      if (response.ok) {
        const user = await response.json()
        sessionStorage.setItem('session', JSON.stringify(user))
        console.log('Login successful');
        const session = JSON.parse(sessionStorage.session)
        setAuth(session)
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error while submitting:', error);
    }
  };
  return (
    <>
   <Navbar isBordered>
      <NavbarBrand>
        <Link href='/'><AcmeLogo /></Link>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        {
        auth.id? 
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem isReadOnly isDisabled  textValue='Мой профиль'key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{auth.email}</p>
            </DropdownItem>
            <DropdownItem textValue='выйти из аккаунта' key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
      <Button type='button' onPress={onOpen}>Sign In/Up</Button>
      }
      </NavbarContent>
    </Navbar>
    <Modal className="w-auto h-auto" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
                     <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-3">
                <Input onChange={handleInputChange}
        value={auth.emailOrLogin || ''}
        name="emailOrLogin"
         isRequired
          label="Email" 
          placeholder="Enter your email"
           type="email" />
                <Input
                 onChange={handleInputChange}
                 value={auth.password || ''}
                 name="password"
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Button size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button onClick={onSubmit} fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-3 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
