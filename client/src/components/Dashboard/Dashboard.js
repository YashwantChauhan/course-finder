import { useState } from 'react'
import Theme from './../Theme/Theme'
import Navbar from './../Navbar/Navbar';
import SearchBar from './../SearchBar/SearchBar'
import Select from './../Select/Select'
import { Stack, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import Card from './../Card/Card'
import prop from './props'
import { gql, useQuery } from '@apollo/client'

let searchValue = " "
let paid = ""
let duration = ""

const query = gql`
  query($search: course!) {
  getCourses(search: $search) {
    status
    error
    courses {
      id,
      name,
      description,
      isPaid,
      url,
      source,
      imageUrl,
      language
      likes {
        username
        friends {
          id
          friend {
            id
          }
        }
      }
    }
  }
}
`

function Dashboard() {

    let { loading, error, data } = useQuery(query, {
        variables: {
            search: {
                search: searchValue
            }
        }
    })

    console.log(loading)
    console.log(error)
    console.log(data)

    const [search, setSearch] = useState(false)

    if (search === true) {
        setSearch(false)
    }

    return (
        <div style={{ overflow: "hidden" }}>
            <Theme />
            <Navbar />
            <Stack direction="row" sx={prop.Stack}>
                <SearchBar onChange={(event) => {
                    searchValue = event.target.value
                }} />
                <Select title="Paid" values={['true', 'false']} onChange={
                    (event) => {
                        paid = event.target.value
                    }
                } />
                <Select title="Duration" values={['< 1 Week', '< 1 Month', '< 3 Months']} onChange={
                    (event) => {
                        duration = event.target.value
                    }
                } />
                <IconButton type="submit" sx={{
                    color: '#00002b',
                }}
                    onClick={
                        () => setSearch(true)
                    }
                    aria-label="search">
                    <Search sx={{
                        transform: "scaleX(-1)",
                    }}
                    />
                </IconButton>
            </Stack>
            <Stack sx={{
                width: '70vw',
                height: '78vh',
                bgcolor: 'white',
                borderRadius: '6px',
                overflowY: 'scroll',
                margin: "3.6vh 0 0 6vw",
                padding: "3px"
            }}>
                {if(data){
                    data.getCourses.courses.map(course=>{
                        return <Card />
                    })
                }
                else{
                    return {}
                }
            </Stack>

        </div>
    )
}

export default Dashboard;


