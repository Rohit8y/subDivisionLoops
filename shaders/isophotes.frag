#version 410
// Fragment shader

layout(location = 0) in vec3 vertcoords_fs;
layout(location = 1) in vec3 vertnormal_fs;

uniform int frequency;
uniform int stripesCode;

out vec4 fColor;

// Fix vector
const vec3 fixvector = vec3(1.0, 0.0,0.0);

//Colors for stripes
const vec3 whitecolour = vec3(1.0, 1.0, 1.0);
const vec3 blackcolour = vec3(0.0, 0.0, 0.0);
const vec3 redcolour = vec3(1.0, 0.0, 0.0);
const vec3 bluecolour = vec3(0.0, 0.0, 1.0);

// Isophotes
vec3 getIsophotes(vec3 normal){
    // Vector to be returned
    vec3 returnIso;
    vec3 firstcolour = vec3(0.0, 0.0, 0.0);
    vec3 secondcolour =vec3(0.0, 0.0, 0.0);

    float angle = dot(fixvector,normal);
    //int frequency = 10;
    float temp = normalize(sin(frequency*angle)) ;
    
    //Setting color values
    secondcolour =whitecolour;
    if (stripesCode == 0){
        firstcolour = blackcolour;
    }
    else if (stripesCode == 1){
        firstcolour = redcolour;
    }
    else if (stripesCode == 2){
        firstcolour = bluecolour;
    }
    
    
    if (temp <= 0.5){
        returnIso = firstcolour;
    }
    else{
        returnIso =secondcolour;
    }
    return returnIso;
}

void main() {
  vec3 isoOutput = getIsophotes(vertnormal_fs);
  fColor = vec4(isoOutput, 1.0);
}

