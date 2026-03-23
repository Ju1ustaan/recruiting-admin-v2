'use client'

import { useState } from "react"

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  renderContent: (activeTab: string) => React.ReactNode
}

export const Tabs = ({ tabs, renderContent }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div>
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 rounded-t-lg transition-colors duration-200 cursor-pointer
              ${activeTab === tab.id
                ? 'bg-blue-300 text-white'
                : 'text-gray-600 hover:bg-blue-100'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`bg-blue-300 rounded-b-lg transition-colors duration-200 rounded-tr-lg ${(activeTab !== tabs[0].id)
                ? 'rounded-t-lg'
                : 'rounded-t-none'
              }`}>
        {renderContent(activeTab)}
      </div>
    </div>
  )
}