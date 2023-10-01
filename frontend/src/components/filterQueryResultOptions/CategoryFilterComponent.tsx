import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef, useState } from 'react';

type CategoryFilterComponentProps = {
  setCategoriesFromFilter: any;
};

const CategoryFilterComponent = ({ setCategoriesFromFilter }:CategoryFilterComponentProps) => {
  const { categories } = useSelector((state:any) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const myRefs = useRef<HTMLInputElement[]>([]);
  const selectCategory = (e: ChangeEvent<HTMLInputElement>, category: { name: string; }, idx: number) => {
    setCategoriesFromFilter((items: any) => {
      return { ...items, [category.name]: e.target.checked };
    });

    var selectedMainCategory = category.name.split('/')[0];
    var allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });
    var indexesOfMainCategory = allCategories.reduce((acc:any, item :any) => {
      var cat = item.name.split('/')[0];
      if (selectedMainCategory === cat) {
        acc.push(item.idx);
      }
      return acc;
    }, []);
    if (e.target.checked) {
      setSelectedCategories((old:any) => [...old, 'cat']);
      myRefs.current.map((_, idx) => {
        if (!indexesOfMainCategory.includes(idx))
          myRefs.current[idx].disabled = true;
        return '';
      });
    } else {
      setSelectedCategories((old) => {
        var a = [...old];
        a.pop();
        if (a.length === 0) {
          window.location.href = '/product-list';
        }
        return a;
      });
      myRefs.current.map((_, idx2) => {
        if (allCategories.length === 1) {
          if (idx2 !== idx) myRefs.current[idx2].disabled = false;
        } else if (selectedCategories.length === 1)
          myRefs.current[idx2].disabled = false;
        return '';
      });
    }
  };

   return (
     <>
       <span className="fw-bold">Category</span>
       <Form>
         {categories.map((category: { name: any; }, idx: any) => (
           <div key={idx}>
             <Form.Check type="checkbox" id={`check-api2-${idx}`}>
               <Form.Check.Input
                 ref={(el: HTMLInputElement) => (myRefs.current[idx] = el)}
                 type="checkbox"
                 isValid
                 onChange={(e) => selectCategory(e, category, idx)}
               />
               <Form.Check.Label style={{ cursor: 'pointer' }}>
                 {category.name}
               </Form.Check.Label>
             </Form.Check>
           </div>
         ))}
       </Form>
     </>
   );
};

export default CategoryFilterComponent;
