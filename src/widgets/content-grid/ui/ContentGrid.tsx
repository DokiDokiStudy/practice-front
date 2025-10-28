import { CardButton } from "@/shared/ui";
import { CONTENT_ITEMS } from "../model/content";

export const ContentGrid = () => {
  return (
    <div className="flex-1 px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {CONTENT_ITEMS.map((item) => (
          <CardButton
            key={item.id}
            to={item.to}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
