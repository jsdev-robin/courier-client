import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { EllipsisIcon } from 'lucide-react';

const UnassignedParcelList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Assignment Center</CardTitle>
        <CardDescription>Drag & drop parcels to assign agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2">
          <div className="grid grid-cols-1 gap-2">
            <Heading as="h6" className="text-base font-semibold" asChild>
              Unassigned Parcels
            </Heading>
            <ScrollArea className="max-h-100">
              <ItemGroup className="space-y-2 pr-4">
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      #CP-8756
                      <Badge className="bg-green-500/5 text-green-500">
                        Small
                      </Badge>
                      <Badge className="bg-violet-500/5 text-violet-500">
                        COD
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>Sarah Johnson • 0.8 miles</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      <EllipsisIcon />
                    </Button>
                  </ItemActions>
                </Item>
              </ItemGroup>
            </ScrollArea>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Heading as="h6" className="text-base font-semibold" asChild>
              Available Agents
            </Heading>
            <ScrollArea className="max-h-100">
              <ItemGroup className="space-y-2 pr-4">
                <Item variant="outline">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage
                        src={'https://github.com/maxleiter.png'}
                        className="grayscale"
                      />
                      <AvatarFallback>ddd</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="w-full">
                      Michael Wilson
                      <Badge className="bg-green-500/5 text-green-500 ml-auto">
                        Available
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>4.9 • 18 parcels today</ItemDescription>
                  </ItemContent>
                  <ItemFooter>
                    <span>South Zone</span>
                    <Button size="sm">Assign</Button>
                  </ItemFooter>
                </Item>
                <Item variant="outline">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage
                        src={'https://github.com/maxleiter.png'}
                        className="grayscale"
                      />
                      <AvatarFallback>ddd</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="w-full">
                      Michael Wilson
                      <Badge className="bg-green-500/5 text-green-500 ml-auto">
                        Available
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>4.9 • 18 parcels today</ItemDescription>
                  </ItemContent>
                  <ItemFooter>
                    <span>South Zone</span>
                    <Button size="sm">Assign</Button>
                  </ItemFooter>
                </Item>
                <Item variant="outline">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage
                        src={'https://github.com/maxleiter.png'}
                        className="grayscale"
                      />
                      <AvatarFallback>ddd</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="w-full">
                      Michael Wilson
                      <Badge className="bg-green-500/5 text-green-500 ml-auto">
                        Available
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>4.9 • 18 parcels today</ItemDescription>
                  </ItemContent>
                  <ItemFooter>
                    <span>South Zone</span>
                    <Button size="sm">Assign</Button>
                  </ItemFooter>
                </Item>
                <Item variant="outline">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage
                        src={'https://github.com/maxleiter.png'}
                        className="grayscale"
                      />
                      <AvatarFallback>ddd</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="w-full">
                      Michael Wilson
                      <Badge className="bg-green-500/5 text-green-500 ml-auto">
                        Available
                      </Badge>
                    </ItemTitle>
                    <ItemDescription>4.9 • 18 parcels today</ItemDescription>
                  </ItemContent>
                  <ItemFooter>
                    <span>South Zone</span>
                    <Button size="sm">Assign</Button>
                  </ItemFooter>
                </Item>
              </ItemGroup>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnassignedParcelList;
