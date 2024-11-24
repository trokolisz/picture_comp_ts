import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import LightDarkSwitch from "@/components/light-dark-switch";

interface HeadProps {
  data: string;
}

const Head = ({ data }: HeadProps) => {
  if (typeof data !== 'string') {
    console.error('Expected data to be a string');
    return null;
  }
  const slugParts = data.split('/').filter(Boolean);

  return (
    <div className='w-full'>
      <header className="flex h-16 shrink-0 items-center gap-2 justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {slugParts.map((part, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/${slugParts.slice(0, index + 1).join('/')}`}>
                      {part}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <LightDarkSwitch />
      </header>
      
    </div>

  )
}

export default Head
