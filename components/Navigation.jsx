import { ImStatsBars } from 'react-icons/im';

export default function Nav() {
    return ( <header className="container max-w-2xl px-6 py-6 mx-auto" >
    <div className="flex items-center justify-between">
      {/* User Information */}
      <div className="flex items-center gap-2">
        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
        {/* Profile Pic */}
        <img className="object-cover w-full h-full" src="https://static.vecteezy.com/system/resources/thumbnails/024/029/935/small_2x/wolf-angry-face-icon-clipart-transparent-background-free-png.png"/>
        </div>
  
        {/* Name */}
        <small>Hi, M. Sami Bhojani!</small>
      </div>
  
      {/* Right Side of Nav*/}
      <nav className="flex items-center gap-2">
        <div><ImStatsBars className='text-2xl'/></div>
        <div><button className='btn btn-danger'>Sign out</button></div>
      </nav>
      </div>
  </header>
    )
}