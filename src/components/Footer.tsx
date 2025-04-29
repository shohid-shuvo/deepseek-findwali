import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8" style={{ backgroundColor: '#40115B' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* Footer logo and copyright */}
          <div className="mb-4 md:mb-0 text-center">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#ED3284' }}>
              <span className='text-amber-50'>Find</span><span className='italic'>Wali</span>
            </Link>
            {/* Footer links */}
          <div className="flex flex-wrap gap-6">
            <Link 
              href="/terms" 
              className="hover:text-[#ED3284] transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="hover:text-[#ED3284] transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-[#ED3284] transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Contact Us
            </Link>
          </div>
            <p className="mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              © {new Date().getFullYear()} FindWali. All rights reserved.
            </p>
          </div>

          
        </div>
      </div>
    </footer>
  )
}