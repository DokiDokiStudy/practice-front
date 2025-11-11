import { CardButton } from "@/shared/ui";
import { mainCategories } from "../model/mainCategories";

export const ContentGrid = () => {
  const categoryList = mainCategories();
  return (
    <div className="flex-1 px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {categoryList.map((item) => (
          <CardButton
            key={item.name}
            to={item.link}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
