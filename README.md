# gates
Overview and data visualization website for the Gates project

## for testing purpose
- selection combination of ABCABCA produces graphs with stats from 10% to 2%
- selection combination of BBCCAAA produces graphs with stats from 25% to 17% (but this is not available for testing now since B is not an option for school)
- all other selection combinations produce graphs of varied and relatively messy Status

## notes on selection
- only selection options for school are imported from data file for now
- if a selection is left empty, it is automatically taken as A (which represents Any)
- for multi-selection, if any option is chosen together with A, for example, ABC, then ultimately only A appears in the query
- for attendance, if C (which represents Part Time) is chosen, then all other selections are automatically set to A and disabled
