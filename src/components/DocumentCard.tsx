import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  isFeatured?: boolean;
  isDisabled?: boolean;
  href?: string;
}

export default function DocumentCard({
  title,
  subtitle,
  icon,
  isFeatured = false,
  isDisabled = false,
  href,
}: DocumentCardProps) {
  const cardContent = (
    <Card
      className={cn(
        "transition-all cursor-pointer",
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-lg hover:border-primary",
        isFeatured && "border-2 border-primary"
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary">{icon}</div>}
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {isFeatured && (
            <Badge variant="default" className="bg-primary">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {isDisabled && (
          <p className="text-sm text-muted-foreground italic">Coming soon</p>
        )}
      </CardContent>
    </Card>
  );

  if (isDisabled || !href) {
    return cardContent;
  }

  return (
    <Link to={href} className="block">
      {cardContent}
    </Link>
  );
}


