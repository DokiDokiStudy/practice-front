import { useState } from "react";
import { Comment } from "@/entities/comment";
// import { CommentInput } from "./CommentInput";
import {
  Heart,
  MessageCircle,
  Edit2,
  Trash2,
  MoreHorizontal,
  X,
  Check,
} from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

interface CommentCardProps {
  comment: Comment;
  // onReply: (parentId: string, content: string, depth: number) => void;
  onEdit: (commentId: number, content: string) => Promise<void>;
  // onDelete: (commentId: string) => void;
  // onToggleLike: (commentId: string) => void;
  // maxDepth?: number;
}

// const depthColors = {
//   1: "border-l-depth-1",
//   2: "border-l-depth-2",
//   3: "border-l-depth-3",
// };

// const depthBgColors = {
//   1: "bg-depth-1/5",
//   2: "bg-depth-2/5",
//   3: "bg-depth-3/5",
// };

export const CommentCard = ({ comment, onEdit }: CommentCardProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleEdit = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent.trim());
    }
    setIsEditing(false);
  };

  return (
    <>
      {/* Header */}
      <div className="relative flex items-start justify-between gap-3 bg-white border-[1px] border-muted focus:border-primary transition-colors rounded-xl">
        <div className="absolute right-2 top-2 ">
          <div onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}

        {isEditing ? (
          <div className="space-y-2 w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[60px] w-full resize-none"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
              >
                <X className="w-4 h-4" />
              </button>
              <button onClick={handleEdit}>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-foreground leading-relaxed">{comment.content}</p>
        )}
      </div>
    </>
  );
};
//   onReply,
//   onEdit,
//   onDelete,
//   onToggleLike,
//   maxDepth = 3,
// }: CommentCardProps) => {

//   const canReply = comment.depth < maxDepth;

//   const handleReply = (content: string) => {
//     onReply(comment.id, content, comment.depth + 1);
//     setIsReplying(false);
//   };

//   const handleLike = () => {
//     setIsLikeAnimating(true);
//     onToggleLike(comment.id);
//     setTimeout(() => setIsLikeAnimating(false), 300);
//   };

//   const depthKey = comment.depth as 1 | 2 | 3;

//   return (
//     <div className={cn("animate-slide-in", comment.depth > 1 && "ml-6 mt-3")}>
//       <div
//         className={cn(
//           "rounded-xl p-4 transition-all duration-200 hover:shadow-card",
//           comment.depth > 1 &&
//             `border-l-4 ${depthColors[depthKey]} ${depthBgColors[depthKey]}`,
//           comment.depth === 1 && "bg-card shadow-card"
//         )}
//       >

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="iconSm"
//                 className="text-muted-foreground"
//               >
//                 <MoreHorizontal className="w-4 h-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-32">
//               <DropdownMenuItem
//                 onClick={() => setIsEditing(true)}
//                 className="gap-2"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 Edit
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => onDelete(comment.id)}
//                 className="gap-2 text-destructive focus:text-destructive"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//         {/* Actions */}
//         {!isEditing && (
//           <div className="flex items-center gap-1 mt-3">
//             <Button
//               variant={comment.isLiked ? "likeActive" : "like"}
//               size="sm"
//               onClick={handleLike}
//               className={["gap-1 px-2", isLikeAnimating && "animate-like-pop"]
//                 .filter(Boolean)
//                 .join(" ")}
//             >
//               <Heart
//                 className={["w-4 h-4", comment.isLiked && "fill-current"]
//                   .filter(Boolean)
//                   .join(" ")}
//               />
//               <span className="text-xs font-semibold">{comment.likes}</span>
//             </Button>

//             {canReply && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsReplying(!isReplying)}
//                 className="gap-1 px-2 text-muted-foreground hover:text-secondary"
//               >
//                 <MessageCircle className="w-4 h-4" />
//                 <span className="text-xs font-semibold">Reply</span>
//               </Button>
//             )}
//           </div>
//         )}

//         {/* Reply Input */}
//         {isReplying && (
//           <div className="mt-4">
//             <CommentInput
//               onSubmit={handleReply}
//               placeholder={`Reply to ${comment.author}...`}
//               autoFocus
//               showCancel
//               onCancel={() => setIsReplying(false)}
//             />
//           </div>
//         )}
//       </div>

//       {/* Nested Replies */}
//       {comment.replies.length > 0 && (
//         <div className="space-y-0">
//           {comment.replies.map((reply) => (
//             <CommentCard
//               key={reply.id}
//               comment={reply}
//               onReply={onReply}
//               onEdit={onEdit}
//               onDelete={onDelete}
//               onToggleLike={onToggleLike}
//               maxDepth={maxDepth}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
