import { Form } from 'react-bootstrap';
type AttributesFilterComponentProps = {
  attrsFilter: any;
  setAttrsFromFilter: any;
};

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }: AttributesFilterComponentProps) => {
  //   console.log(attrsFilter);
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter :any , idx:any) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{filter.key}</b>
            </Form.Label>
            {filter.value.map((valueForKey:any, idx2:any) => (
              <Form.Check
                key={idx2}
                type="checkbox"
                label={valueForKey}
                onChange={(e) => {
                  setAttrsFromFilter((filters:any) => {
                    if (filters.length === 0) {
                      return [{ key: filter.key, values: [valueForKey] }];
                    }

                    let index = filters.findIndex(
                      (item:any) => item.key === filter.key
                    );
                    if (index === -1) {
                      // if not found (if clicked key is not inside filters)
                      return [
                        ...filters,
                        { key: filter.key, values: [valueForKey] },
                      ];
                    }

                    // if clicked key is inside filters and checked
                    if (e.target.checked) {
                      filters[index].values.push(valueForKey);
                      let unique = [...new Set(filters[index].values)];
                      filters[index].values = unique;
                      return [...filters];
                    }

                    // if clicked key is inside filters and unchecked
                    let valuesWithoutUnChecked = filters[index].values.filter(
                      (val:any) => val !== valueForKey
                    );
                    filters[index].values = valuesWithoutUnChecked;
                    if (valuesWithoutUnChecked.length > 0) {
                      return [...filters];
                    } else {
                      let filtersWithoutOneKey = filters.filter(
                        (item:any) => item.key !== filter.key
                      );
                      return [...filtersWithoutOneKey];
                    }
                  });
                }}
              />
            ))}
          </div>
        ))}
    </>
  );
};

export default AttributesFilterComponent;
