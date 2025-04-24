import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ChatBot from "@/components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homeless Helpers - Support for Those Facing Homelessness",
  description: "Find resources, support and community to help you through difficult times with mental health focus for homeless individuals.",
  keywords: "homeless support, mental health, homeless resources, UK homelessness, assistance dogs",
};

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-700">Homeless Helpers</Link>
        <button id="navToggle" className="text-gray-700 md:hidden focus:outline-none" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <div id="navMenu" className="hidden md:block">
          <ul className="flex flex-col absolute bg-white left-0 right-0 p-4 shadow-md md:shadow-none md:p-0 md:flex-row md:relative md:space-x-6 text-gray-700">
            <li className="py-2 md:py-0 relative group">
              <button className="hover:text-red-700 focus:outline-none w-full text-left md:w-auto">Get Help</button>
              <ul className="hidden group-hover:block bg-white shadow-md mt-2 py-2 z-50 w-48">
                <li><Link href="/shelters" className="block px-4 py-1 hover:bg-red-100">Find Shelters</Link></li>
                <li><Link href="/foodbanks" className="block px-4 py-1 hover:bg-red-100">Food Banks</Link></li>
                <li><Link href="/healthcare" className="block px-4 py-1 hover:bg-red-100">Healthcare</Link></li>
                <li><Link href="/employment" className="block px-4 py-1 hover:bg-red-100">Employment</Link></li>
                <li><Link href="/emergency" className="block px-4 py-1 hover:bg-red-100">Emergency</Link></li>
              </ul>
            </li>
            <li className="py-2 md:py-0 relative group">
              <button className="hover:text-red-700 focus:outline-none w-full text-left md:w-auto">Mental Health</button>
              <ul className="hidden group-hover:block bg-white shadow-md mt-2 py-2 z-50 w-48">
                <li><Link href="/mental-health" className="block px-4 py-1 hover:bg-red-100">Resources</Link></li>
                <li><Link href="/addictions" className="block px-4 py-1 hover:bg-red-100">Addiction Support</Link></li>
                <li><Link href="/mental-health-assessment" className="block px-4 py-1 hover:bg-red-100">Assessment</Link></li>
              </ul>
            </li>
            <li className="py-2 md:py-0 relative group">
              <button className="hover:text-red-700 focus:outline-none w-full text-left md:w-auto">Support</button>
              <ul className="hidden group-hover:block bg-white shadow-md mt-2 py-2 z-50 w-48">
                <li><Link href="/post-housing" className="block px-4 py-1 hover:bg-red-100">After Housing</Link></li>
                <li><Link href="/network" className="block px-4 py-1 hover:bg-red-100">Support Network</Link></li>
                <li><Link href="/volunteer" className="block px-4 py-1 hover:bg-red-100">Volunteer</Link></li>
              </ul>
            </li>
            <li className="py-2 md:py-0 relative group">
              <button className="hover:text-red-700 focus:outline-none w-full text-left md:w-auto">Dog Services</button>
              <ul className="hidden group-hover:block bg-white shadow-md mt-2 py-2 z-50 w-48">
                <li><Link href="/dog-friendly-resources" className="block px-4 py-1 hover:bg-red-100">Dog-Friendly Resources</Link></li>
                <li><Link href="/protection-dogs" className="block px-4 py-1 hover:bg-red-100">Protection Dogs</Link></li>
                <li><Link href="/service-dog-certification" className="block px-4 py-1 hover:bg-red-100">Service Dog Certification</Link></li>
                <li><Link href="/verify-assistance-dog" className="block px-4 py-1 hover:bg-red-100">Verify Assistance Dog</Link></li>
              </ul>
            </li>
            <li className="py-2 md:py-0 relative group">
              <button className="hover:text-red-700 focus:outline-none w-full text-left md:w-auto">Tools</button>
              <ul className="hidden group-hover:block bg-white shadow-md mt-2 py-2 z-50 w-48">
                <li><Link href="/helpfulbot" className="block px-4 py-1 hover:bg-red-100">HelpfulBot</Link></li>
                <li><Link href="/lettermaker" className="block px-4 py-1 hover:bg-red-100">Letter Maker</Link></li>
                <li><Link href="/interview" className="block px-4 py-1 hover:bg-red-100">Interview Prep</Link></li>
              </ul>
            </li>
            <li className="py-2 md:py-0"><Link href="/about" className="hover:text-red-700">About</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[#06454b] py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Homeless Helpers</h3>
            <p className="mb-4">Providing support, resources and hope to those facing homelessness with a focus on mental health and wellbeing.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-red-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/get-help" className="hover:underline">Get Help</Link></li>
              <li><Link href="/mental-health" className="hover:underline">Mental Health</Link></li>
              <li><Link href="/resources" className="hover:underline">Resources</Link></li>
              <li><Link href="/shelters" className="hover:underline">Find Shelters</Link></li>
              <li><Link href="/foodbanks" className="hover:underline">Food Banks</Link></li>
              <li><Link href="/siteindex" className="hover:underline">Site Index</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li>General Inquiries: <a href="mailto:info@homeless.website" className="hover:underline">info@homeless.website</a></li>
              <li>Help Line: <a href="mailto:helpme@homeless.website" className="hover:underline">helpme@homeless.website</a></li>
              <li>Volunteer: <a href="mailto:volunteer@homeless.website" className="hover:underline">volunteer@homeless.website</a></li>
              <li>Service Dogs: <a href="mailto:dogs@homeless.website" className="hover:underline">dogs@homeless.website</a></li>
              <li>Phone: <a href="tel:+447853811172" className="hover:underline">+44 7853 811172</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© 2025 Homeless Helpers. All rights reserved.</p>
          <p className="mt-2 text-sm">This website provides information based on British law. For emergency assistance, please call 999.</p>
        </div>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <ChatBot />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const navToggle = document.getElementById('navToggle');
                const navMenu = document.getElementById('navMenu');
                
                if (navToggle && navMenu) {
                  navToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('hidden');
                  });
                  
                  // Close menu when clicking outside
                  document.addEventListener('click', function(event) {
                    const isClickInsideNav = navToggle.contains(event.target) || 
                                           (navMenu.contains(event.target) && window.innerWidth < 768);
                    
                    if (!isClickInsideNav && !navMenu.classList.contains('hidden') && window.innerWidth < 768) {
                      navMenu.classList.add('hidden');
                    }
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
