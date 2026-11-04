import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FESTORA 2027 platform...");

  // Roles
  const roles = [
    { name: "SUPER_ADMIN", description: "Full system access", isSystem: true },
    { name: "EVENT_MANAGER", description: "Manage event content and registrations", isSystem: true },
    { name: "SPEAKER_MANAGER", description: "Manage speakers", isSystem: true },
    { name: "SPONSOR_MANAGER", description: "Manage sponsors", isSystem: true },
    { name: "STALL_MANAGER", description: "Manage stalls and owners", isSystem: true },
    { name: "ARTIST_MANAGER", description: "Manage artists and performers", isSystem: true },
    { name: "REGISTRATION_MANAGER", description: "View and manage registrations + check-in", isSystem: true },
    { name: "CHECKIN_STAFF", description: "QR scan and check-in only", isSystem: true },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // Super Admin (change password after first login!)
  const passwordHash = await bcrypt.hash("FestoraAdmin2027!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@festora.in" },
    update: {},
    create: {
      email: "admin@festora.in",
      passwordHash,
      name: "FESTORA Super Admin",
      isActive: true,
    },
  });

  const superRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
  if (superRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: admin.id, roleId: superRole.id } },
      update: {},
      create: { userId: admin.id, roleId: superRole.id },
    });
  }

  // Event - FESTORA 2027
  const event = await prisma.event.upsert({
    where: { id: "festora-2027" },
    update: {},
    create: {
      id: "festora-2027",
      name: "FESTORA",
      tagline: "One Festival. Endless Experiences.",
      description: `FESTORA 2027 – The Grand Food & Carnival Festival

FESTORA 2027 is a four-day grand food, shopping and entertainment festival bringing together delicious flavours, exciting shopping experiences and unlimited fun under one roof.

Organised in Belagavi from 12th to 15th January 2027, FESTORA aims to create a vibrant platform for food lovers, shopping enthusiasts, local entrepreneurs, families and visitors of all age groups.

The festival will feature 50 exclusive stalls, including 25 food stalls offering a variety of cuisines and 25 shopping stalls showcasing fashion, accessories, lifestyle products and more.

Visitors can enjoy live cooking demonstrations by chefs, exciting cooking competitions for kids and adults, interactive carnival games, creative photo booths, music, dance performances and live entertainment throughout the four days.

FESTORA will also recognise and reward outstanding food and shopping stall owners through special awards, encouraging creativity, quality and entrepreneurship.

More than just a festival, FESTORA is an experience that brings people together through food, culture, creativity and celebration. With something exciting for everyone, it promises four unforgettable days filled with flavours, laughter, entertainment and memories.`,
      category: "Food Festival, Shopping Exhibition & Carnival",
      theme: "One Festival. Endless Experiences",
      startDate: new Date("2027-01-12T00:00:00+05:30"),
      endDate: new Date("2027-01-15T23:59:59+05:30"),
      startTime: "10:00",
      endTime: "22:00",
      timezone: "Asia/Kolkata",
      venueName: "CPAD Ground",
      venueAddress: "Club Road, Belagavi",
      organizerName: "Sanskruti Hongekar",
      organizerEmail: "sanskrutihongekar@gmail.com",
      organizerPhone: "12345567789",
      isPublished: true,
      registrationMode: "OPEN",
      socialLinks: {},
    },
  });

  // Default pages
  const pages = [
    { slug: "home", title: "Home", sortOrder: 0 },
    { slug: "about", title: "About the Event", sortOrder: 1 },
    { slug: "agenda", title: "Event Agenda", sortOrder: 2 },
    { slug: "speakers", title: "Speakers", sortOrder: 3 },
    { slug: "sponsors", title: "Sponsors", sortOrder: 4 },
    { slug: "partners", title: "Partners", sortOrder: 5 },
    { slug: "exhibitors", title: "Exhibitors", sortOrder: 6 },
    { slug: "artists", title: "Artists and Performers", sortOrder: 7 },
    { slug: "workshops", title: "Workshops", sortOrder: 8 },
    { slug: "venue", title: "Venue and Location", sortOrder: 9 },
    { slug: "registration", title: "Registration", sortOrder: 10 },
    { slug: "tickets", title: "Ticket Details", sortOrder: 11 },
    { slug: "contact", title: "Contact", sortOrder: 12 },
    { slug: "privacy", title: "Privacy Policy", sortOrder: 13 },
    { slug: "terms", title: "Terms and Conditions", sortOrder: 14 },
  ];

  for (const p of pages) {
    await prisma.eventPage.upsert({
      where: { eventId_slug: { eventId: event.id, slug: p.slug } },
      update: {},
      create: {
        eventId: event.id,
        slug: p.slug,
        title: p.title,
        isEnabled: true,
        sortOrder: p.sortOrder,
        content: {},
      },
    });
  }

  // Ticket types
  const ticketTypes = [
    { name: "General Attendee", description: "Entry for general visitors", price: 0, sortOrder: 0 },
    { name: "VIP", description: "VIP access with special privileges", price: 499, sortOrder: 1 },
    { name: "Food Stall Owner", description: "Registration for food stall owners", price: 0, sortOrder: 2 },
    { name: "Shopping Stall Owner", description: "Registration for shopping stall owners", price: 0, sortOrder: 3 },
    { name: "Speaker", description: "Speaker / chef registration", price: 0, sortOrder: 4 },
    { name: "Artist / Performer", description: "Artist and performer registration", price: 0, sortOrder: 5 },
    { name: "Volunteer", description: "Volunteer registration", price: 0, sortOrder: 6 },
  ];

  for (const tt of ticketTypes) {
    await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: tt.name,
        description: tt.description,
        price: tt.price,
        currency: "INR",
        isActive: true,
        sortOrder: tt.sortOrder,
      },
    });
  }

  // Basic form fields for general registration
  const fields = [
    { label: "Full Name", fieldKey: "fullName", fieldType: "text", isRequired: true, sortOrder: 0 },
    { label: "Email Address", fieldKey: "email", fieldType: "email", isRequired: true, sortOrder: 1 },
    { label: "Mobile Number", fieldKey: "phone", fieldType: "phone", isRequired: true, sortOrder: 2 },
    { label: "City", fieldKey: "city", fieldType: "text", isRequired: false, sortOrder: 3 },
    { label: "Organization / College", fieldKey: "organization", fieldType: "text", isRequired: false, sortOrder: 4 },
  ];

  for (const f of fields) {
    await prisma.registrationFormField.create({
      data: {
        eventId: event.id,
        label: f.label,
        fieldKey: f.fieldKey,
        fieldType: f.fieldType,
        isRequired: f.isRequired,
        sortOrder: f.sortOrder,
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log("----------------------------------------");
  console.log("Super Admin login:");
  console.log("  Email:    admin@festora.in");
  console.log("  Password: FestoraAdmin2027!");
  console.log("----------------------------------------");
  console.log("Change this password immediately after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
