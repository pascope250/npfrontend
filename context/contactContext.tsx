'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";
export interface ContactInquiry {
  type: "contact";
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface AdvertiseInquiry {
  type: "advertise";
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
  date: string;
}

interface ContactContextType {
  addContactInquiry: (data: Omit<ContactInquiry, "type" | "date">) => void;
  addAdvertiseInquiry: (data: Omit<AdvertiseInquiry, "type" | "date">) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hobby.nepoba.com';
export const useContactContext = () => {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContactContext must be used within ContactProvider");
  return ctx;
};

export const ContactProvider = ({ children }: { children: ReactNode }) => {

  const addContactInquiry = async (data: Omit<ContactInquiry, "type" | "date">) => {
    try {      
      const response = await fetch(`${BACKEND_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data
        }),
      });
      if (!response.ok) {
        toast.error("Failed to send your message. Please try again later.",{id: 'contact-toast'});
        throw new Error("Network response was not ok");
      }
      toast.success("Your message has been sent successfully!", {id: 'contact-toast'});
    } catch (error) {
      console.error("Error adding contact inquiry:", error);
      toast.error("An error occurred while sending your message. Please try again later.", {id: 'contact-toast'});
    }
  };

  const addAdvertiseInquiry = async (data: Omit<AdvertiseInquiry, "type" | "date">) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/contacts/advertise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      if (!response.ok) {
        toast.error("Failed to send your advertisement inquiry. Please try again later.", {id: 'advertise-toast'});
        throw new Error("Network response was not ok");
      }
      toast.success("Your advertisement inquiry has been sent successfully!", {id: 'advertise-toast'});
    } catch (error) {
      console.error("Error adding advertise inquiry:", error);
      toast.error("An error occurred while sending your advertisement inquiry. Please try again later.", {id: 'advertise-toast'});
    }
   
  };

  return (
    <ContactContext.Provider value={{ addContactInquiry, addAdvertiseInquiry }}>
      {children}
    </ContactContext.Provider>
  );
};