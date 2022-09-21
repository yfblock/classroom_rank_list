import React, { useState } from 'react'
import { Input, Space, Select } from 'antd'
import Icon from '../../components/Icon'

export interface ISearchProps {
  name: string
  assignment: string
  language: string[]
}

const { Search } = Input
const { Option } = Select

interface IProps {
  defaultQuery: Partial<ISearchProps>
  onChange: (query: Partial<ISearchProps>) => void
  noLang?: boolean
  langs?: string[]
  isMobile?: boolean
}

const SearchList = (props: Partial<IProps>) => {
  const [query, setQuery] = useState<Partial<ISearchProps>>(props.defaultQuery || {})
  const onChange = (key: keyof ISearchProps, v: string | string[]) => {
    const newQuery = { ...query, [key]: v }
    setQuery(newQuery)
    props.onChange?.(newQuery)
  }
  return props.isMobile ? (
    <Input
      value={query.name}
      placeholder="Name"
      className="query-name-input"
      onChange={(e) => onChange('name', e.target.value.trim())}
      prefix={<Icon symbol="icon-autosearch" />}
      // onSearch={(v) => onSearch('name', v)}
      style={{
        width: '84%',
      }}
    />
  ) : (
    <Space size={60} style={{ paddingLeft: 40 }}>
      <Search
        value={query.name}
        placeholder="Name"
        className="query-name-input"
        onChange={(e) => onChange('name', e.target.value.trim())}
        // onSearch={(v) => onSearch('name', v)}
        style={{ width: 200 }}
      />
      {/* <Search
          value={query.assignment}
          placeholder="Assignment"
          onChange={(e) => onChange('assignment', e.target.value.trim())}
          // onSearch={(v) => onSearch('assignment', v)}
          style={{ width: 200 }}
        /> */}
      {false && !props.noLang && (
        <Select
          mode="multiple"
          allowClear
          style={{ width: 200 }}
          placeholder="Language"
          onChange={(v: string[]) => onChange('language', v)}
        >
          {props.langs?.map((l) => (
            <Option key={l}>{l}</Option>
          ))}
        </Select>
      )}
    </Space>
  )
}

export default SearchList
